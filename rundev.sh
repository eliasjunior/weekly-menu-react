#!/bin/bash
mongod &
cd ~/Documents/GitHub/week-menu-api
npm run dev &
cd ~/Documents/GitHub/weekly-menu-react
npm run dev
