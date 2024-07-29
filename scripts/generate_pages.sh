from jinja2 import Environment, FileSystemLoader
import os

# Directory setup
template_dir = '../templates'
output_dir = '../public_html'

# Jinja2 setup
env = Environment(loader=FileSystemLoader(template_dir))
base_template = env.get_template('base.html')

# Function to get page details from the user
def get_page_details():
    filename = input('Enter filename (with .html extension): ')
    title = input('Enter title: ')
    content = input('Enter content (HTML): ')
    return {'filename': filename, 'title': title, 'content': content}

# Get the number of pages to generate
num_pages = int(input('How many pages do you want to generate? '))

# Get details for each page
pages = []
for i in range(num_pages):
    print(f'Enter details for page {i + 1}:')
    page = get_page_details()
    pages.append(page)

# Generate pages
for page in pages:
    with open(os.path.join(output_dir, page['filename']), 'w') as f:
        f.write(base_template.render(
            title=page['title'],
            description='HideoutSMP | {}'.format(page['title']),
            keywords='Minecraft,Server,Gaming,Survival,PvP,Minigames',
            author='itzMiney',
            content=page['content']
        ))

print("Pages generated successfully.")
