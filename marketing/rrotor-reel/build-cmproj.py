#!/usr/bin/env python3
"""Lays the reel out as a Camtasia project: rrotor-reel.cmproj (a Mac package: project.tscproj and the media).

Three tracks: Graphic (rrotor-reel-graphic.mp4 from 0:00), Screen recording (empty) and Voice-over (empty); the
scene clips in the media bin; a marker at every scene and every voiceover line, named with the words. The file
format is the one Camtasia 2026 writes (version 10.0, editRate 705600000, sourceBin + timeline.sceneTrack), read
off his own projects; the media's track ranges are what Camtasia writes for an mp4 (milliseconds, editRate 1000).

    python3 build-cmproj.py        # after render.mjs
"""
import json
import os
import re
import shutil
import subprocess
import time
from pathlib import Path

HERE = Path(__file__).resolve().parent
OUT = HERE / "rrotor-reel.cmproj"
RATE = 705_600_000           # Camtasia's edit rate: ticks a second
FPS, W, H = 30, 1920, 1080

SCENES = [
    ("01-hook", 0, 5), ("02-session", 5, 13), ("03-race", 13, 27), ("04-apps", 27, 35),
    ("05-clis", 35, 43), ("06-programs", 43, 50), ("07-end", 50, 56.5),
]


def lines_from_script():
    """The voiceover table in voiceover-and-caption.md: (start seconds, words)."""
    out = []
    for line in (HERE / "voiceover-and-caption.md").read_text().splitlines():
        m = re.match(r"\| (\d+):(\d+\.\d) \| \d+:\d+\.\d \| (.+) \|$", line)
        if m:
            out.append((int(m.group(1)) * 60 + float(m.group(2)), m.group(3).strip()))
    return out


def probe(path):
    """Duration in ms, frames, and whether there is an audio track, from ffprobe."""
    j = json.loads(subprocess.check_output([
        "ffprobe", "-v", "error", "-print_format", "json", "-show_streams", "-show_format", str(path)]))
    v = next(s for s in j["streams"] if s["codec_type"] == "video")
    a = any(s["codec_type"] == "audio" for s in j["streams"])
    ms = round(float(j["format"]["duration"]) * 1000)
    return ms, int(v.get("nb_frames") or round(ms / 1000 * FPS)), a


def bin_entry(id_, rel, name, ms, has_audio, stamp):
    tracks = [{
        "range": [0, ms], "type": 0, "editRate": 1000, "trackRect": [0, 0, W, H], "sampleRate": FPS,
        "bitDepth": 24, "numChannels": 0, "integratedLUFS": 100.0, "peakLevel": -1.0, "tag": 0,
        "metaData": f"{name};", "parameters": {},
    }]
    if has_audio:
        tracks.append({
            "range": [0, ms], "type": 2, "editRate": 1000, "trackRect": [0, 0, 0, 0], "sampleRate": 48000,
            "bitDepth": 16, "numChannels": 2, "integratedLUFS": -70.0, "peakLevel": 0.0, "tag": 0,
            "metaData": f"{name};", "parameters": {},
        })
    return {
        "id": id_, "src": rel, "rect": [0, 0, W, H], "lastMod": stamp, "loudnessNormalization": True,
        "sourceTracks": tracks, "metadata": {"timeAdded": stamp},
    }


def vmfile(id_, src, ident, ms):
    dur = round(ms / 1000 * RATE)
    return {
        "id": id_, "_type": "VMFile", "src": src, "trackNumber": 0, "attributes": {"ident": ident},
        "parameters": {"geometryCrop0": 0.0, "geometryCrop1": 0.0, "geometryCrop2": 0.0, "geometryCrop3": 0.0},
        "effects": [], "start": 0, "duration": dur, "mediaStart": 0, "mediaDuration": dur, "scalar": 1,
        "metadata": {"clipSpeedAttribute": {"type": "bool", "value": False}, "effectApplied": "none"},
        "animationTracks": {},
    }


def track_attributes(ident):
    return {"ident": ident, "audioMuted": False, "videoHidden": False, "magnetic": False, "matte": 0, "solo": False,
            "metadata": {"IsLocked": "False", "trackHeight": "78"}}


def main():
    graphic = HERE / "rrotor-reel-graphic.mp4"
    if not graphic.is_file():
        raise SystemExit("render first: node render.mjs")
    if OUT.exists():
        shutil.rmtree(OUT)
    stamp = time.strftime("%Y%m%dT%H%M%S")
    media_dir = OUT / "media" / f"{time.time():.6f}"
    media_dir.mkdir(parents=True)
    (OUT / "recordings").mkdir()

    bins, next_id = [], 1
    shutil.copy2(graphic, media_dir / graphic.name)
    ms, _, audio = probe(graphic)
    bins.append(bin_entry(next_id, f"./media/{media_dir.name}/{graphic.name}", graphic.name, ms, audio, stamp))
    graphic_src, graphic_ms = next_id, ms
    next_id += 1
    for name, _, _ in SCENES:
        clip = HERE / "clips" / f"{name}.mp4"
        shutil.copy2(clip, media_dir / clip.name)
        cms, _, caudio = probe(clip)
        bins.append(bin_entry(next_id, f"./media/{media_dir.name}/{clip.name}", clip.name, cms, caudio, stamp))
        next_id += 1

    markers = []
    for name, a, _ in SCENES:
        markers.append((a, f"Scene {name[3:]}"))
    for at, words in lines_from_script():
        markers.append((at, words))
    markers.sort()
    keyframes = []
    seen = set()
    for at, words in markers:
        tick = round(at * RATE)
        if tick in seen:            # a scene and a line at the same moment: one marker, the words
            keyframes = [k for k in keyframes if k["time"] != tick]
        seen.add(tick)
        keyframes.append({"endTime": tick, "time": tick, "value": words, "duration": 0})
    keyframes.sort(key=lambda k: k["time"])

    timeline_id = next_id
    next_id += 1
    project = {
        "title": "rrotor reel", "description": "", "author": "", "targetLoudness": -18.0,
        "shouldApplyLoudnessNormalization": True, "videoFormatFrameRate": FPS, "audioFormatSampleRate": 44100,
        "allowSubFrameEditing": False, "width": float(W), "height": float(H), "version": "10.0", "editRate": RATE,
        "authoringClientName": {"name": "Camtasia", "platform": "Mac", "version": "2026.2.0"},
        "sourceBin": bins,
        "timeline": {
            "id": timeline_id,
            "sceneTrack": {"scenes": [{"csml": {"tracks": [
                {"trackIndex": 0, "medias": [vmfile(next_id, graphic_src, "rrotor-reel-graphic", graphic_ms)],
                 "transitions": [], "parameters": {}, "ident": "Graphic", "audioMuted": False, "videoHidden": False,
                 "magnetic": False, "matte": 0, "solo": False, "metadata": {"IsLocked": "False", "trackHeight": "78"}},
                {"trackIndex": 1, "medias": [], "transitions": [], "parameters": {}, "ident": "Screen recording",
                 "audioMuted": False, "videoHidden": False, "magnetic": False, "matte": 0, "solo": False,
                 "metadata": {"IsLocked": "False", "trackHeight": "78"}},
                {"trackIndex": 2, "medias": [], "transitions": [], "parameters": {}, "ident": "Voice-over",
                 "audioMuted": False, "videoHidden": False, "magnetic": False, "matte": 0, "solo": False,
                 "metadata": {"IsLocked": "False", "trackHeight": "78"}},
            ]}}]},
            "trackAttributes": [track_attributes("Graphic"), track_attributes("Screen recording"),
                                track_attributes("Voice-over")],
            "parameters": {"toc": {"type": "string", "keyframes": keyframes}},
            "captionAttributes": {"enabled": True, "fontName": "Arial", "fontSize": 32,
                                  "backgroundColor": [0, 0, 0, 204], "foregroundColor": [255, 255, 255, 255],
                                  "lang": "en", "alignment": 0, "defaultFontSize": True, "opacity": 0.5},
            "gain": 1.0, "legacyAttenuateAudioMix": False, "backgroundColor": [0, 0, 0, 255],
        },
        "metadata": {},
    }
    (OUT / "project.tscproj").write_text(json.dumps(project, indent=1))
    print(OUT, f"{len(bins)} media, {len(keyframes)} markers, {graphic_ms / 1000:.1f} s")


if __name__ == "__main__":
    os.chdir(HERE)
    main()
