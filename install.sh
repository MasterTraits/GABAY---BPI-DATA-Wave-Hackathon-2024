#!/bin/bash

echo "Creating virtual environment..."
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
npm install 

cd .. 
