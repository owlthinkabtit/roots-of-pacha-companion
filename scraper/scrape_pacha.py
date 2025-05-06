import requests
from bs4 import BeautifulSoup
import json
import time

base_url = "https://rootsofpacha.wiki.gg"
characters_url = f"{base_url}/wiki/Characters"

response = requests.get(characters_url)
soup = BeautifulSoup(response.text, 'html.parser')

character_names = []
for link in soup.select("a[href^='/wiki/']"):
    href = link.get("href")
    name = href.replace("/wiki/", "").strip()

    # Filter out non-character pages
    if name and name not in character_names and ":" not in name:
        character_names.append(name)

character_names = list(set(character_names))
print(f"🧍 Found {len(character_names)} character pages: {character_names}")

# Predefined birthdays (you can add/edit these manually)
manual_birthdays = {
    "Ada": "Spring 4",
    "Agar": "Fall 26",
    "Brin": "Summer 22",
    "Croll": "Fall 18",
    "Daari": "Winter 8",
    "Eret": "Summer 10",
    "Frér": "Winter 19",
    "Garrek": "Spring 16",
    "Grob": "Summer 3",
    "Illoe": "Spring 28",
    "Jag": "Fall 8",
    "Jelrod": "Spring 7",
    "Kaleb": "Winter 12",
    "Kregg": "Winter 3",
    "Loha": "Fall 22",
    "Mana": "Summer 14",
    "Nokk": "Spring 22",
    "Okka": "Winter 24",
    "Paewha": "Fall 12",
    "Rak": "Summer 26",
    "Sagga": "Spring 10",
    "Sham": "Fall 4",
    "Tare": "Summer 18",
    "Torn": "Winter 15",
    "Ubi": "Fall 14",
    "Vakk": "Spring 19",
    "Voda": "Winter 6",
    "Yeri": "Summer 30",
    "Zeda": "Fall 28"
}


character_data = {}

for name in character_names:
    url = f"{base_url}/wiki/{name}"
    print(f"🌿 Scraping {name}...")

    try:
        res = requests.get(url)
        soup = BeautifulSoup(res.text, 'html.parser')

        # Find loved items
        love_items = []
        tables = soup.find_all("table")
        for table in tables:
            rows = table.find_all("tr")
            for row in rows:
                header_cell = row.find("th")
                if header_cell and header_cell.text.strip().lower() == "love":
                    gift_cell = row.find("td")
                    love_items = [a.text.strip() for a in gift_cell.find_all("a")]
                    break


        character_data[name] = {
            'loves': love_items,
            'birthday': manual_birthdays.get(name, "Unknown")
        }
        time.sleep(1)

    except Exception as e:
        print(f"❌ Failed to scrape {name}: {e}")
        character_data[name] = {'loves': [], 'birthday': "Error"}

with open("pacha-gifts.json", "w", encoding="utf-8") as f:
    json.dump(character_data, f, indent=4, ensure_ascii=False)

print("✅ All character data saved to pacha-gifts.json!")