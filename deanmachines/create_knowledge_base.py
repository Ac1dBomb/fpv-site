import json
import requests
from bs4 import BeautifulSoup
import re

def create_knowledge_base(urls, output_file="nextjs_knowledge_base.json"):
    """
    Creates a structured knowledge base from a list of Next.js documentation URLs.

    Args:
        urls: A list of URLs to scrape.
        output_file: The path to the output JSON file.
    """

    knowledge_base = []

    for url in urls:
        try:
            response = requests.get(url)
            response.raise_for_status()  # Raise an exception for bad status codes (4xx or 5xx)

            soup = BeautifulSoup(response.content, "html.parser")

            # Extract title (topic) - Adjust this based on Next.js doc structure
            title_element = soup.find("h1")  # Example: find the main h1 heading
            if title_element:
                topic = title_element.text.strip()
            else:
                topic = "Untitled" # Or skip if no suitable title found.


            # Extract content -  Refine content extraction
            content_element = soup.find("main") or soup.find("article") # Start with main or article tag
            if content_element:
                content = ""
                for element in content_element.find_all(["p", "h2", "h3", "ul", "ol", "pre", "code"]): # Include more tags as needed.
                    content += element.text.strip() + "\n" # Add new lines to separate
                content = re.sub(r'\n+', '\n', content).strip() #Remove extra newlines.

            else:
                 content = "Content not found." #  Or skip the URL


            # Basic Keyword Extraction (Improve with RAKE, TF-IDF, or KeyBERT later)
            keywords = [word.lower() for word in re.findall(r'\b\w+\b', topic)] # Keywords from title

            knowledge_base.append({
                "category": categorize_url(url),  # Categorize based on URL structure
                "topic": topic,
                "url": url,
                "content": content,
                "keywords": keywords
            })


        except requests.exceptions.RequestException as e:
            print(f"Error fetching URL {url}: {e}")
        except Exception as e:  # Catching broader exceptions for safety. Log errors!
            print(f"Error processing URL {url}: {e}")


    with open(output_file, "w") as f:
        json.dump(knowledge_base, f, indent=4)



def categorize_url(url):
    """Categorizes a URL based on its path."""
    # Customize the categories and regex patterns. Example:
    if "routing" in url:
        return "Routing"
    elif "data-fetching" in url:
        return "Data Fetching"
    elif "styling" in url:
        return "Styling"
    #... more categories.
    else:
        return "Other"


if __name__ == "__main__":
    # URLs from nextjs_rag.txt (read from the file)
    with open("nextjs_rag.txt", "r") as f:
        urls = [line.strip() for line in f if line.startswith("https")]

    create_knowledge_base(urls)