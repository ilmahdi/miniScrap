# miniScrap

This is a simple guide on how to run the app using either Make or Docker Compose.

## Prerequisites

- [Make](https://www.gnu.org/software/make/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Run miniScrap app

1. Clone this repository:

    ```bash
    git clone git@github.com:ilmahdi/miniScrap.git
    ```

2. Navigate to the project directory:

    ```bash
    cd miniScrap
    ```

3. Run the app:

    - Option 1: Using Make:

        ```bash
        make
        ```
    This command will build and start the app as specified in the Makefile.

    - Option 2: Using Docker Compose:

        ```bash
        docker-compose up --build
        ```
    This command will build and start the app as specified in the docker-compose.yml file.


4. Access the app in your browser at [http://localhost:4173](http://localhost:4173).
