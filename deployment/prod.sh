#!/bin/sh
echo ---------------------------------------
echo Deployment Start - Production
echo ---------------------------------------
echo Building and Deploying Model-Render
echo ---------------------------------------
docker-compose -p model-renderer -f docker-compose.yml up -d --build --remove-orphans
echo
echo ---------------------------------------
echo Conntainer Status:
echo ---------------------------------------
docker ps | grep 'model-renderer'