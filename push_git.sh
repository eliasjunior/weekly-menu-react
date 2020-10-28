#!/usr/bin/env bash
FOLDER_TARGET=backup-code
DESTINATION_PATH=~/Downloads
DESTINATION="${DESTINATION_PATH}/${FOLDER_TARGET}"

if [ ! -d "${DESTINATION}" ] ; then
    mkdir ${DESTINATION}
fi
# copy unstaged files to a folder
#git diff --name-only | xargs -I '{}' cp '{}' ${DESTINATION}

declare -a UNSTAGED_FILES
UNSTAGED_FILES=($(git diff --name-only))
# create the file parent folder and copy the file to it destination
for f in "${UNSTAGED_FILES[@]}"; do
    echo $f
    mkdir -p ${DESTINATION}/$(echo $(dirname $f)) && cp $f ${DESTINATION}/$(echo $(dirname $f))
done

#rename js files to dummy extension
find ${DESTINATION} -name "*.js" -exec bash -c 'mv "$1" "${1%.js}".aaa' - '{}' \;

# if want to exclude a folder from search
#find . -path  ./node_modules -prune -false -o -name '*.js' -exec bash -c 'mv "$1" "${1%.js}".aaa' - '{}' \;
cd ${DESTINATION_PATH}
echo "zip -- ${PWD}"
zip -r ${FOLDER_TARGET} ${FOLDER_TARGET}
rm -rf ${DESTINATION}

open https://gmail.com

