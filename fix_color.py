path = r'frontend\src\components\FertilizerGuide.jsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix Market Price label
content = content.replace("color: '#64748b', fontWeight: 800, textTransform: 'uppercase' }}>Market Price", "color: '#374151', fontWeight: 800, textTransform: 'uppercase' }}>Market Price")

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print('Done! Replaced light text colors.')
