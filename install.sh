#!/bin/bash

echo "Adding upstream to your fork..."
git remote add upstream https://github.com/MasterTraits/JBEG-Clutchers.git

echo "Creating virtual environment..."
python -m pip install --upgrade pip 
py -m venv .venv

echo "Activating virtual environment..."
source .venv/Scripts/activate

echo "Installing dependencies..."
cd backend
pip install -r requirements.txt
cd ..

# Install frontend dependencies
git submodule update --init --recursive
cd frontend
git remote add upstream https://github.com/MasterTraits/frontend.git
npm install 

cd .. 
