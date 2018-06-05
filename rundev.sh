#!/bin/bash
mongod &
cd ~/WebstormProjects/projects/week-menu-api
npm run dev &
cd ~/WebstormProjects/projects/weekly-menu-react
npm run dev
