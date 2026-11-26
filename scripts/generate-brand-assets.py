"""Generate the company PDF and social card from the same content as the website.
Requires Pillow and reportlab; does not alter hosting configuration.
"""
import json
from pathlib import Path
from xml.sax.saxutils import escape
from PIL import Image, ImageDraw, ImageFont
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph
from reportlab.lib.utils import ImageReader

ROOT = Path(__file__).resolve().parents[1]
DATA = json.loads((ROOT / 'src/data/portfolio.json').read_text())
BG, PAPER, MUTED, COPPER = '#101111', '#efece5', '#b9bbb4', '#ee9c65'
W, H = A4
FONT_DIR = Path('/usr/share/fonts/truetype/dejavu')
pdfmetrics.registerFont(TTFont('IdeolectSans', str(FONT_DIR / 'DejaVuSans.ttf')))
pdfmetrics.registerFont(TTFont('IdeolectSerif', str(FONT_DIR / 'DejaVuSerif-Italic.ttf')))
OUTPUT = ROOT / 'public/catalogs/Ideolect-Company-Brief.pdf'
OUTPUT.parent.mkdir(parents=True, exist_ok=True)
c = canvas.Canvas(str(OUTPUT), pagesize=A4, invariant=1)
c.setTitle('Ideolect | Company and Product Brief')
c.setAuthor('Ideolect')
c.setSubject('PenSuite, Pencore and Cortex 7.2: product direction and engineering philosophy')

def text(value, x, y, size=11, color=PAPER, font='IdeolectSans'):
    c.setFillColor(HexColor(color)); c.setFont(font, size); c.drawString(x, y, value)

def paragraph(value, x, y, width=483, size=11, color=MUTED, leading=16):
    style = ParagraphStyle('body', fontName='IdeolectSans', fontSize=size, leading=leading, textColor=HexColor(color))
    block = Paragraph(escape(value), style)
    _, height = block.wrap(width, H)
    if y - height < 68:
        raise ValueError('PDF content exceeds safe page area')
    block.drawOn(c, x, y-height)
    return y-height

def base(page, label):
    c.setFillColor(HexColor(BG)); c.rect(0,0,W,H,fill=1,stroke=0)
    text('Ideolect', 56, H-60, 22)
    text(label, 56, H-86, 9, COPPER)
    c.setStrokeColor(HexColor('#353633')); c.line(56,62,W-56,62)
    text('COMPANY & PRODUCT BRIEF',56,42,8,MUTED)
    text('storive.in',W-125,42,8,MUTED)
    text(str(page),W-63,42,8,MUTED)
    c.linkURL('https://www.storive.in/',(W-128,32,W-67,55),relative=0)

def artwork(project, x, y, width, height):
    img=Image.open(ROOT / f"public/images/{project['id']}.webp").convert('RGBA')
    c.drawImage(ImageReader(img), x, y, width=width, height=height, preserveAspectRatio=True, anchor='c', mask='auto')

base(1,'INDEPENDENT SOFTWARE COMPANY')
text('Intelligence,',56,H-160,42)
text('in formation.',56,H-207,44,COPPER,'IdeolectSerif')
y=paragraph('Creative software, security intelligence and engineering agents for people who design, investigate and build.',56,H-237,size=14,leading=21)
for i,p in enumerate(DATA['projects']):
    artwork(p,44+i*170,H-435,165,125)
    text(p['name'],56+i*170,H-455,16,p['color'])
    text(p['category'],56+i*170,H-473,8,MUTED)
y=H-511
text('The Ideolect perspective',56,y,19); y-=22
y=paragraph(DATA['brief']['summary'],56,y,size=12,leading=18)-24
text('Built by Mahammadali Palsaniya',56,y,14); y-=20
y=paragraph('Founder, Ideolect - India. Independent work in creative software, cybersecurity intelligence and AI engineering.',56,y)-15
y=paragraph('Our products are in development. This brief describes their direction and the standards guiding the work.',56,y,size=10,leading=15)-19
text('mhdali@storive.in',56,y,11,COPPER)
c.linkURL('mailto:mhdali@storive.in',(56,y-3,190,y+14),relative=0)
c.showPage()
for i,p in enumerate(DATA['projects'],2):
    base(i,p['category'].upper())
    text(p['name'],56,H-151,38,p['color'])
    artwork(p,285,H-337,255,170)
    y=paragraph(p['summary'],56,H-180,width=225,size=13,leading=20)
    y=min(y-28,H-358)
    for heading,body in p['blocks']:
        text(heading,56,y,16,PAPER); y-=14
        y=paragraph(body,56,y,size=11,leading=17)-25
    c.showPage()
c.save()

# Social preview: compose existing supplied artwork; no replacement imagery is invented.
image=Image.new('RGB',(1200,630),BG)
draw=ImageDraw.Draw(image)
font_dir=Path('/usr/share/fonts/truetype/dejavu')
font=lambda size: ImageFont.truetype(str(font_dir/'DejaVuSans.ttf'),size)
serif=lambda size: ImageFont.truetype(str(font_dir/'DejaVuSerif.ttf'),size)
draw.text((62,42),'Ideolect',font=font(30),fill=PAPER)
draw.line((62,103,1138,103),fill='#353633',width=1)
draw.text((62,140),'Intelligence,',font=font(64),fill=PAPER)
draw.text((62,219),'in formation.',font=serif(66),fill=COPPER)
draw.text((65,329),'Design. Investigate. Reason.',font=font(22),fill=MUTED)
art=Image.open(ROOT/'public/images/pencore.webp').convert('RGBA')
art.thumbnail((480,410),Image.Resampling.LANCZOS)
image.paste(art,(700+(440-art.width)//2,110+(410-art.height)//2),art)
draw.line((62,511,1138,511),fill='#353633',width=1)
for i,p in enumerate(DATA['projects']):
    draw.text((62+i*365,548),p['name'],font=font(26),fill=p['color'])
image.save(ROOT/'public/images/ideolect-social.png',optimize=True)
print(f'Generated {OUTPUT.relative_to(ROOT)} (4 pages) and social preview.')
