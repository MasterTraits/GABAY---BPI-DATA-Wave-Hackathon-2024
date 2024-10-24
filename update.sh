#!/bin/bash

# Update main branch
git pull origin main

# Update sub module
cd frontend 
git pull origin main
npm install