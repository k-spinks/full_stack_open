sequenceDiagram
participant browser
participant server

    browser->>server: GET /spa
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET /main.css
    activate server
    server-->>browser: CSS file
    deactivate server

    browser->>server: GET /main.js
    activate server
    server-->>browser: JS file
    deactivate server

    Note over browser: JS executes and requests JSON

    browser->>server: GET /data.json
    activate server
    server-->>browser: JSON file
    deactivate server
