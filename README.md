# Zendesk support integration
This is a work in progress and is private until a workflow is designed

This repo is made to sync source content to Zendesk using their API. It will provide documentation and support articles instead of using the Zendesk editor.

The ideal goals for this repo are as follows:

- To keep all support documentation open source
- To standardise the way support documentation is written
- To maintain the theme within Zendesk

# Folder structure
The folder structure of this repo is purely for organisation and to make it easier to understand but also mimics the structure of articles in Zendesk.

All `.md` files within the `content/` folder will be treated as something that relates to a Zendesk object. The folder structure is as follows:

- `content/` - Content that will be sent to Zendesk. 
    - `_assets/` - Assets (such as images) for articles to use directly (not uploaded to Zendesk)
    - `{category}/` - Used to group sections together. Purely for organisation in the repo
        - `_category.md` - Metadata that describes the category for Zendesk
        - `{section}/` - Used to group articles together. Purely for organisation in the repo
            - `_section.md` - Metadata that describes the section for Zendesk
            - `{article}.md` - The article that will be sent to Zendesk
- `theme/` - The theme that will be used in Zendesk