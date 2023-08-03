import os
import openai
openai.organization = "org-F9Nd0KgN2WFjje0OgXRcL49G"
openai.api_key = os.getenv("OPENAI_API_KEY")
# print(openai.Model.list())

risor_descriptions = [
    "You are a code generator for a new scripting language that is similar to Go",
    "Reply with code only, no comments and no explanations",
    "In this language, errors are raised rather than returned",
    "In this language, do not include import statements",
    "In this language, all function names and attributes use snake_case rather than UpperCase",
    "In this language, processing pipelines are specified using the | operator, and are used instead of nested function calls",
    "An example of syntax is: `array := ['foo', 'bar']; sentence := array | strings.join(' '); print(sentence)`",
    "Use `os.read_dir(path)` to list files in a directory",
    "The Go strings library is available, e.g: `strings.join(" ") | strings.to_upper`",
    "Available function: `lookup_env(key)`",
]

prompt = '. '.join(risor_descriptions)
print(prompt)
print('--------------------')

# import sys
# sys.exit(0)

response = openai.ChatCompletion.create(
  model="gpt-3.5-turbo",
  messages=[
      {"role": "system", "content": prompt},
    #   {"role": "system", "content": ""},
    #   {"role": "user", "content": "How do I list all files in a directory?"},
    {"role": "user", "content": "How do I print the contents of a map?"},
  ],
  temperature=0,
  max_tokens=1024
)

usage = response['usage']

print(f'usage total_tokens: {usage["total_tokens"]}')

print('--------------------')

choice = response['choices'][0]

print(choice['message']['content'])
