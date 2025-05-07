import json

# Load your existing data
with open("pacha-gifts.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# Character names you want to test with
test_characters = ["Igrork", "Mana"]  # Change these to any two you prefer

# Simulate image scraping by assigning placeholder URLs (you'll replace this later)
for name, character in data["characters"].items():  # Corrected to data["characters"]
    if name in test_characters:
        character["image"] = f"https://rootsofpacha.wiki.gg/images/{character['name'].replace(' ', '_')}.png"

# Save the updated data back to the same file
with open("pacha-gifts.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("✅ Test complete! Only the selected characters should now have an 'image' field.")
