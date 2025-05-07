import requests
from bs4 import BeautifulSoup
import json
import time
from tqdm import tqdm

# Load your existing character data
with open("pacha-gifts.json", "r", encoding="utf-8") as file:
    data = json.load(file)

# Base wiki URL
base_url = "https://rootsofpacha.wiki.gg"

# Step 1: Go to character page and find file page link
def get_character_image_url(name):
    page_url = f"{base_url}/wiki/{name.replace(' ', '_')}"
    try:
        response = requests.get(page_url)
        soup = BeautifulSoup(response.content, "html.parser")

        # Find the link to the File page
        a_tag = soup.select_one("a.image.image-thumbnail")
        if a_tag and a_tag.has_attr("href"):
            file_page_url = base_url + a_tag["href"]

            # Step 2: Go to file page and get the actual image URL
            file_response = requests.get(file_page_url)
            file_soup = BeautifulSoup(file_response.content, "html.parser")

            # Find the direct image link
            full_image_link = file_soup.select_one("a[href*='/images/']")
            if full_image_link and full_image_link.has_attr("href"):
                href = full_image_link["href"]
                if href.startswith("/"):
                    return base_url + href
                return href
    except Exception as e:
        print(f"❌ Error for {name}: {e}")
    return "Not found"

# Loop with progress bar
for name in tqdm(data, desc="Fetching character images"):
    image_url = get_character_image_url(name)
    data[name]["image"] = image_url
    time.sleep(1.5)  # Respectful crawling

# Save updated JSON
with open("pacha-gifts.json", "w", encoding="utf-8") as file:
    json.dump(data, file, indent=2, ensure_ascii=False)

print("✅ All done! Your JSON now includes direct character image URLs.")
