#!/usr/bin/env python3
"""Generate Indonesian male voice-over and a procedural ambient bed offline."""
import subprocess
import wave
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
AUDIO = ROOT / "public" / "audio"
AUDIO.mkdir(parents=True, exist_ok=True)
phrases = [
    "Kamu tidak kekurangan waktu.",
    "Kamu hanya terlalu sering memberikannya pada hal yang tidak penting.",
    "Pilih satu hal yang benar-benar membawa kamu maju.",
    "Kerjakan tiga puluh menit. Matikan gangguan.",
    "Selesaikan, jangan menunggu sempurna.",
    "Perubahan besar tumbuh dari tindakan kecil yang diulang.",
    "Mulai hari ini. Satu langkah. Lalu ulangi besok.",
]
parts = []
for i, phrase in enumerate(phrases, 1):
    path = AUDIO / f"part-{i:02}.wav"
    subprocess.run(
        ["espeak", "-v", "id", "-s", "175", "-p", "35", "-a", "170", "-w", str(path), phrase],
        check=True,
    )
    with wave.open(str(path), "rb") as audio:
        parts.append((audio.getparams(), audio.readframes(audio.getnframes())))

params = parts[0][0]
with wave.open(str(AUDIO / "voiceover.wav"), "wb") as output:
    output.setparams(params)
    silence = bytes(round(params.framerate * 0.22) * params.nchannels * params.sampwidth)
    for i, (_, frames) in enumerate(parts):
        output.writeframes(frames)
        if i != len(parts) - 1:
            output.writeframes(silence)

subprocess.run([
    "ffmpeg", "-y", "-hide_banner", "-loglevel", "error", "-f", "lavfi", "-i",
    "aevalsrc=0.045*sin(2*PI*110*t)*(0.65+0.35*sin(2*PI*0.08*t))+0.025*sin(2*PI*164.81*t)+0.009*sin(2*PI*220*t):s=48000:d=30",
    "-ac", "2", str(AUDIO / "ambient-bed.wav")
], check=True)
