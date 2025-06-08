# FE Assignment - Dang Hung Nguyen

-   A ReactJS assignment for Junior Front-End Developer position · [Live Demo](https://fe-assignment-nguyen-dang-hung.vercel.app)

# Junior Front-end Engineer Assignment - May 2025

-   Copyright (c) River Flow Solutions, Jsc. 2025. All rights reserved.
-   We only use the submissions for candidates evaluation.

## Assignment List

-   Layout Implementation (CSS, HTML)
-   JSON Forms rendering component
-   Paginated List component

## General Requirements

-   Use either [ShaDN](https://ui.shadcn.com/), [TailwindCSS](https://tailwindcss.com/) for UI layout
-   Use either of ReactJS, VueJS, Svelte-Kit for the Main Framework.
-   Use either of the following libaries for State Management:
    -   [Redux-toolkit](https://redux-toolkit.js.org/)
    -   [Nanostores](https://github.com/nanostores/nanostores)
-   No limit of using AI / help as long as the candidate can understand and explain the related technical details.

## Instructions

Candidate must fork this repository to a public repo under their name for submission.

Each candidate must implement at least 2 assignments out of 3 from the list.

In case of technical difficulties, candidate may describe how the problem should be resolved in NARRATION.md. However, executable code is always preferrable.

## A1: Layout Implementation

-   Implement 3 Figma Screens into CSS, HTML using TailwindCSS / ShaDN: [Design](https://www.figma.com/design/LM6tzSajnXW4EemOCoKfAI/Recruitment-05--2025?node-id=0-1&p=f)

## A2: JSON form rendering components

-   Implement a component that receive [JSON Schemas](https://json-schema.org/) input (via a text box) and render HTML forms.
-   Implement a custom input component (embedded within the JSON schema renderer) to input new Vietnamese address field (output data is a single text field) with following input layout:

    ```
    [Tỉnh / Thành phố]
    [Phường / Xã]
    [Đường và số nhà]

    NOTE: danh sách phường xã cần được cập nhật theo Tỉnh / Thành phố được lựa chọn (có thể dùng data sample, không cần chính xác với thực tế)
    ```

-   Match the form looks and feel with the UI framework of choice (ShaDN / TailwindCSS).
-   Form content is saved to the state store and persist across page refreshes.
-   There should be a reset action to reset the data in the store.

## A3: Paginated component

Implement a component that render the [data](https://github.com/datablist/sample-csv-files?tab=readme-ov-file) as paginated tables.

-   Data can be converted into JSON before use.
-   Allow sorting and change sorting order by clicking the table header.
-   Allow filter by each columns values.
-   The current page & active filter must be saved to the state store and persist across page refreshes
