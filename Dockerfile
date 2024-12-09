FROM ubuntu:jammy-20230804

RUN apt-get update && \
    apt-get install --no-install-recommends -y \
        python3=3.10.6-1~22.04.1 \
        python3-pip \
        python3-venv=3.10.6-1~22.04.1 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* && \
    pip install --no-cache-dir pip==22.0.2

WORKDIR /app
COPY requirements.txt .
COPY main.py .
COPY download_models.py .

RUN python3 -m venv .venv

ENV PATH="/app/.venv/bin:$PATH"

RUN pip install --no-cache-dir -r requirements.txt && \
    python3 download_models.py

EXPOSE 6000

ENTRYPOINT [ "python3" ]

CMD [ "main.py" ]