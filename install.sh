#!/bin/bash

echo "Updating your package installers..."
python -m pip install --upgrade pip 
npm install -g npm

echo "Adding upstream to your fork..."
git remote add upstream https://github.com/MasterTraits/JBEG-Clutchers.git

echo "Creating virtual environment..."
cd backend
py -m venv .venv

echo "Activating virtual environment..."
if source .venv/Scripts/activate
then
    echo "Virtual environment activated."
else
    .venv/Scripts/activate
fi

echo "Installing dependencies..."
pip install requirements.txt
cd ..

# Install frontend dependencies
git submodule update --init --recursive
cd frontend
git remote add upstream https://github.com/MasterTraits/frontend.git
npm install 

cd .. 
