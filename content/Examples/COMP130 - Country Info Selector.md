---
title: Building a Country Information Finder in Python!
date: 2025-03-24
tags: [example, comp130, api, requests, json, python]
experience: [all-levels]
---

# Building a Country Information Finder in Python!

Are you fresh out of COMP 130, have taken a programming course at Dickinson or have some programming experience? Do YOU want to build something practical that actually connects to the internet? You've come to the right place! In this tutorial, we're going to build a simple but powerful tool that lets you look up information about any country in the world - and we'll do it step-by-step with detailed explanations along the way.

## What We're Going to Build

Imagine typing a country's name into your computer and instantly getting back information like:
- The country's official name
- Its population
- What region of the world it's in
- Its capital city
- What languages people speak there
- What currencies they use
- And even a link to see their flag!

That's exactly what we're going to build today, and the best part is: it's completely free! We'll use a public API (Application Programming Interface) that doesn't require any kind of registration or API key.

## What You'll Need

- A computer with Python installed (version 3.6 or higher)
- A basic understanding of Python (variables, functions, loops)
- A text editor or IDE (like VSCode, PyCharm, or even just Notepad)
- An internet connection

Don't worry if you're still learning Python - I'll explain everything we're doing in detail!

## Introduction to APIs: What Are They and Why Do They Matter?

Before we start coding, let's understand what an API is. 

Think of an API as a waiter in a restaurant. You (the customer) don't go into the kitchen to prepare your own food. Instead, you tell the waiter what you want, and they bring it to you from the kitchen. Similarly, an API is a middleman that takes your request, gets the data you need from a server (the kitchen), and brings it back to you in a format you can use.

In our case, we'll be using the REST Countries API. This API contains information about every country in the world, and it lets us access that information by making simple requests through the internet.

APIs are incredibly important in modern programming because they allow your applications to communicate with other services and access data that would be impractical to store or maintain yourself. Imagine trying to keep an up-to-date database of information about every country in the world - it would be a huge task! But with an API, we can just request that information whenever we need it.

## Setting Up Your Project Environment

Let's start by creating a dedicated space for our project:

1. **Create a project folder**: First, we need to create a folder to keep all our project files organized. You can do this through your file explorer or using the command line:

```bash
mkdir country-info-finder
cd country-info-finder
```

The first command (`mkdir`) creates a new directory (folder) called "country-info-finder". The second command (`cd`) moves you into that directory.

2. **Create a virtual environment (optional but recommended)**: 

A virtual environment is like a separate, isolated installation of Python for each project. This helps avoid conflicts between package versions when you work on multiple projects. Think of it as giving each project its own personal bookshelf instead of sharing one big bookshelf for all your books.

To create a virtual environment:

```bash
python -m venv venv
```

This command creates a new virtual environment named "venv" in your project folder. The `python -m venv` part tells Python to run the venv module, which is responsible for creating virtual environments.

3. **Activate the virtual environment**:

Before installing packages, we need to activate the virtual environment:

On Windows:
```bash
venv\Scripts\activate
```

On macOS/Linux:
```bash
source venv/bin/activate
```

When activated, you'll notice your command prompt changes to show the name of the virtual environment. This confirms that you're now working within the isolated environment.

4. **Install the requests library**:

Now we need to install the main library we'll use for our project - the requests library. This library makes it easy to send HTTP requests, which is how we'll communicate with the API.

```bash
pip install requests
```

The `pip install` command is how we install Python packages. Pip is Python's package manager, like an app store for Python libraries.

## Creating Our Python Script

Now that our environment is set up, let's create our Python script:

1. Create a new file named `country_info.py` in your project folder. You can do this with your favorite text editor or IDE.

2. We'll start building our script step-by-step, explaining each part along the way.

## Step 1: Import Necessary Libraries

First, let's add the libraries we need at the top of our script:

```python
import requests
import sys
import json
```

Let's understand what each of these libraries does:

- **requests**: Requests is a standard Python library that makes it easy to send HTTP requests. We'll use it to communicate with the REST Countries API. HTTP (Hypertext Transfer Protocol) is the standard way computers talk to each other over the internet.

- **sys**: This is a built-in Python library that provides access to some variables used or maintained by the Python interpreter. We'll mainly use it to access command-line arguments (the country name that the user types when running our program).

- **json**: JSON (JavaScript Object Notation) is a popular format for storing and exchanging data. The API will send us data in JSON format, and this library helps us work with that data. Though the requests library automatically converts JSON responses to Python dictionaries, we include this for clarity.

## Step 2: Create a Function to Get Country Information

Next, let's create our first function, which will be responsible for fetching country data from the API:

```python
def get_country_info(country_name):
    """
    Fetches information about a country using the REST Countries API.
    
    Args:
        country_name (str): Name of the country to search for
        
    Returns:
        dict: Country information or None if not found
    """
    # Format the URL with the country name
    base_url = "https://restcountries.com/v3.1/name/"
    url = f"{base_url}{country_name}"
    
    try:
        # Make the request
        response = requests.get(url)
        
        # Check if the request was successful
        if response.status_code == 404:
            return None
        
        response.raise_for_status()
        
        # Parse the JSON response
        countries = response.json()
        return countries
        
    except requests.exceptions.RequestException as e:
        print(f"Error fetching data: {e}")
        return None
```

Let's break down what exactly this code does here:

- First, we define a function called `get_country_info` that takes one parameter: `country_name`. This parameter is the name of the country we want to look up.

- Inside the function, we start by creating the URL we'll use to make our request. The base URL is `"https://restcountries.com/v3.1/name/"`, and we add the country name to the end of it. For example, if we're looking up Sweden, the full URL would be `"https://restcountries.com/v3.1/name/Sweden"`.

- Next, we use a `try/except` block to handle any errors that might occur when making the request. This is a good practice because network requests can fail for various reasons (internet disconnection, server down, etc.).

- Inside the try block, we use `requests.get(url)` to send a GET request to the API. A GET request is like asking the API to give us some data.

- We store the response in a variable called `response`. This response contains the data the API sends back, along with status information.

- We check if the response has a status code of 404, which means "Not Found". If we get this status code, it means the API couldn't find any country with the name we provided, so we return `None`.

- If the status code isn't 404, we call `response.raise_for_status()`. This method raises an exception if the response indicates an error (like if the server is down). This helps us catch other types of errors.

- If there are no errors, we use `response.json()` to convert the JSON data from the response into a Python list of dictionaries. Each dictionary contains information about a country that matches our search.

- Finally, we return the list of countries.

- If any exception occurs during this process, we catch it, print an error message, and return `None`.

## Step 3: Create a Function to Display Country Information

Now that we can fetch data from the API, let's create a function to display that data in a readable format:

```python
def display_country_info(countries):
    """
    Displays the country information in a readable format.
    
    Args:
        countries (list): List of country dictionaries
    """
    if not countries:
        print("No country found with that name.")
        return
    
    # Sort countries by name
    countries.sort(key=lambda x: x['name']['common'])
    
    for country in countries:
        print("\n" + "="*50)
        print(f"Country: {country['name']['common']}")
        print(f"Official Name: {country['name']['official']}")
        print(f"Region: {country['region']}")
        print(f"Subregion: {country.get('subregion', 'N/A')}")
        print(f"Capital: {', '.join(country.get('capital', ['N/A']))}")
        print(f"Population: {country['population']:,}")
        
        # Currencies
        if 'currencies' in country:
            print("Currencies:")
            for code, currency in country['currencies'].items():
                print(f"  - {currency.get('name', 'N/A')} ({code})")
        
        # Languages
        if 'languages' in country:
            print("Languages:")
            for code, language in country['languages'].items():
                print(f"  - {language}")
        
        # Flag
        if 'flags' in country:
            print(f"Flag URL: {country['flags'].get('png', 'N/A')}")
```

This function formats and displays the country information. Let's understand it in detail:

- We define a function called `display_country_info` that takes one parameter: `countries`. This parameter is the list of country dictionaries we get from the `get_country_info` function.

- First, we check if the `countries` list is empty or None. If it is, we print a message saying no country was found and return from the function.

- Next, we sort the countries by their common name using the `sort` method with a lambda function. A lambda function is a small, anonymous function that can be defined in a single line. Here, it tells Python to sort the countries based on the value of `['name']['common']` in each country dictionary.

- Then, we loop through each country in the sorted list and print its information.

- We use a line of "=" characters to separate each country's information visually.

- For each piece of information (country name, official name, region, etc.), we extract it from the country dictionary and print it.

- Some fields might not be present in all country dictionaries, so we use the `get` method, which allows us to provide a default value (like 'N/A') if the field doesn't exist.

- For fields that are lists (like 'capital'), we use `', '.join()` to convert the list to a comma-separated string.

- For fields that are dictionaries (like 'currencies' and 'languages'), we loop through each key-value pair and print them.

- Finally, we print the URL of the country's flag image, which can be used to view the flag online.

## Step 4: Create the Main Function

Now, let's create the main function that will tie everything together:

```python
def main():
    """
    Main function to run the program.
    """
    # Check if a country name was provided
    if len(sys.argv) < 2:
        print("Please provide a country name.")
        print("Usage: python country_info.py 'Country Name'")
        return
    
    # Get the country name from command line arguments
    country_name = ' '.join(sys.argv[1:])
    print(f"Searching for information about: {country_name}")
    
    # Get and display the country information
    countries = get_country_info(country_name)
    display_country_info(countries)
```

This function orchestrates the program's flow. Let's understand it step by step:

- We define a function called `main` that doesn't take any parameters.

- First, we check if the user provided a country name when running the program. `sys.argv` is a list containing the command-line arguments. `sys.argv[0]` is the name of the script itself, and `sys.argv[1:]` are the additional arguments provided by the user.

- If the length of `sys.argv` is less than 2, it means the user didn't provide any country name. In this case, we print a usage message and return from the function.

- If the user did provide a country name, we join all the arguments after the script name into a single string. This allows the user to input country names with spaces (like "New Zealand") without having to use quotes.

- We print a message indicating which country we're searching for.

- We call the `get_country_info` function to fetch the country information from the API.

- Finally, we call the `display_country_info` function to display the information to the user.

## Step 5: Run the Main Function When the Script is Executed

Finally, let's add code to run the `main` function when the script is executed:

```python
if __name__ == "__main__":
    main()
```

This is a common Python idiom that you'll see in many scripts. Let's understand what it does:

- When a Python script is run, Python sets several special variables. One of these is `__name__`.

- If the script is being run directly (as opposed to being imported by another script), `__name__` is set to `"__main__"`.

- So, this code checks if the script is being run directly. If it is, it calls the `main` function.

- This structure allows the script to be both run directly and imported by other scripts without executing the `main` function when imported.

## The Complete Code

Now, let's put everything together to see the complete script:

```python
import requests
import sys
import json

def get_country_info(country_name):
    """
    Fetches information about a country using the REST Countries API.
    
    Args:
        country_name (str): Name of the country to search for
        
    Returns:
        dict: Country information or None if not found
    """
    # Format the URL with the country name
    base_url = "https://restcountries.com/v3.1/name/"
    url = f"{base_url}{country_name}"
    
    try:
        # Make the HTTP request
        response = requests.get(url)
        
        # Check if the request was successful
        if response.status_code == 404:
            return None
        
        response.raise_for_status()
        
        # Parse the JSON response
        countries = response.json()
        return countries
        
    except requests.exceptions.RequestException as e:
        print(f"Error fetching data: {e}")
        return None

def display_country_info(countries):
    """
    Displays the country information in a readable format.
    
    Args:
        countries (list): List of country dictionaries
    """
    if not countries:
        print("No country found with that name.")
        return
    
    # Sort countries by name
    countries.sort(key=lambda x: x['name']['common'])
    
    for country in countries:
        print("\n" + "="*50)
        print(f"Country: {country['name']['common']}")
        print(f"Official Name: {country['name']['official']}")
        print(f"Region: {country['region']}")
        print(f"Subregion: {country.get('subregion', 'N/A')}")
        print(f"Capital: {', '.join(country.get('capital', ['N/A']))}")
        print(f"Population: {country['population']:,}")
        
        # Currencies
        if 'currencies' in country:
            print("Currencies:")
            for code, currency in country['currencies'].items():
                print(f"  - {currency.get('name', 'N/A')} ({code})")
        
        # Languages
        if 'languages' in country:
            print("Languages:")
            for code, language in country['languages'].items():
                print(f"  - {language}")
        
        # Flag
        if 'flags' in country:
            print(f"Flag URL: {country['flags'].get('png', 'N/A')}")

def main():
    """
    Main function to run the program.
    """
    # Check if a country name was provided
    if len(sys.argv) < 2:
        print("Please provide a country name.")
        print("Usage: python country_info.py 'Country Name'")
        return
    
    # Get the country name from command line arguments
    country_name = ' '.join(sys.argv[1:])
    print(f"Searching for information about: {country_name}")
    
    # Get and display the country information
    countries = get_country_info(country_name)
    display_country_info(countries)

if __name__ == "__main__":
    main()
```

## Running Your Program

Now that we have our complete script, let's run it:

1. Open your terminal or command prompt.
2. Navigate to your project directory (the folder where `country_info.py` is saved).
3. Make sure your virtual environment is activated (if you created one).
4. Run the script with a country name:

```bash
python country_info.py Sweden
```

You should see output similar to this:

```
Searching for information about: Sweden

==================================================
Country: Sweden
Official Name: Kingdom of Sweden
Region: Europe
Subregion: Northern Europe
Capital: Stockholm
Population: 10,353,442
Currencies:
  - Swedish krona (SEK)
Languages:
  - Swedish
Flag URL: https://flagcdn.com/w320/se.png
```

Try running it with different country names, like "United States", "Japan", or "Brazil". You can even try partial names or multiple countries that share a name (like "Guinea" - there's Guinea, Guinea-Bissau, Equatorial Guinea, and Papua New Guinea).

## Understanding What's Happening Behind the Scenes

When you run your program, here's what happens step by step:

1. Python starts executing your script from the top.
2. It imports the necessary libraries: `requests`, `sys`, and `json`.
3. It defines the three functions we created: `get_country_info`, `display_country_info`, and `main`.
4. It checks if `__name__ == "__main__"`, which it is when you run the script directly, so it calls the `main` function.
5. The `main` function checks if you provided a country name. If you did, it proceeds; if not, it shows usage instructions.
6. It calls `get_country_info` with the country name you provided.
7. `get_country_info` constructs the API URL and sends a GET request to the REST Countries API.
8. The API processes your request and sends back data about countries that match your search.
9. `get_country_info` receives this data, converts it from JSON to a Python list of dictionaries, and returns it.
10. The `main` function calls `display_country_info` with the list of countries.
11. `display_country_info` formats and prints the country information in a readable way.

This flow of data - from user input, to API request, to API response, to formatted output - is a common pattern in many applications that work with APIs.

## Enhancing Your Program

Now that you have a basic working program, here are some ideas to enhance it:

1. **Add more error handling**: Currently, our program handles basic errors, but you could add more detailed error handling. For example, you could handle network connectivity issues separately.

2. **Create a graphical user interface (GUI)**: Instead of using the command line, you could create a GUI using a library like Tkinter, PyQt, or Kivy. This would make your program more user-friendly.

3. **Save results to a file**: You could add an option to save the country information to a file (like a CSV or JSON file) for later reference.

4. **Add more search options**: The REST Countries API allows searching by more than just country name. You could add options to search by capital city, language, currency, or region.

5. **Visualize the data**: You could use libraries like Matplotlib or Plotly to create visualizations of the data. For example, you could create a bar chart comparing the populations of different countries.

## Conclusion

Congratulations! You've built a complete Python application that fetches and displays information about countries using a public API. This project demonstrates several important programming concepts:

- Working with APIs and making HTTP requests
- Handling and parsing JSON data
- Error handling with try/except blocks
- Command-line argument processing
- Formatting and displaying data

These skills are fundamental to many types of applications and will serve you well as you continue your programming journey. The ability to interact with APIs opens up a world of possibilities, as there are thousands of public APIs available for everything from weather forecasts to movie information to stock prices (hint hint for some possible projects!).

Remember, practice is key to becoming proficient in programming. Try enhancing this program with some of the suggestions above, or create a similar program using a different API that interests you.

Happy coding!