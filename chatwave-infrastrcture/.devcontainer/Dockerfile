FROM ubuntu:jammy
# FROM ubuntu:jammy-20230425

# Installing some packages used by Gitpod for compatibility based on: 
# https://hub.docker.com/r/gitpod/workspace-full/dockerfile
# Skipping some of the build tools for languages we aren't using

RUN ["/bin/bash", "-c", "echo I am now using bash!"]

# Install Dependencies

RUN yes | unminimize \
    && apt update \    
    && apt install -yq \
    apt-utils --no-install-recommends apt-utils \
    asciidoctor \        
    bash-completion \
    build-essential \
    ca-certificates \
    curl \
    git \
    git-lfs \
    gnupg \
    htop \
    jq \
    less \
    llvm \
    locales \
    lsb-release \
    man-db \
    net-tools \        
    nano \        
    python3 \        
    python3-pip \    
    software-properties-common \
    ssh \
    sudo \
    unzip \
    zip \
    wget \
    vim \     
    && locale-gen en_US.UTF-8 \
    && apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/*
ENV LANG=en_US.UTF-8

# Setting Time Zones
ENV TZ=America/New_York
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Install NodeJS
RUN cd /tmp \
    && curl -fsSL https://deb.nodesource.com/setup_19.x | sudo -E bash \    
    && sudo apt install -y nodejs


# Set up user chatwave
ARG USERNAME=chatwave
ARG USER_UID=1001
ARG USER_GID=$USER_UID
RUN groupadd --gid $USER_GID $USERNAME \
    && useradd --uid $USER_UID --gid $USER_GID -m $USERNAME \
    && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME
USER $USERNAME

# Refresh OS and packages
RUN sudo apt update \
    && sudo apt upgrade -yq \
    && sudo apt autoremove -y

ENV SHELL /bin/bash