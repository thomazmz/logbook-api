#!/bin/bash

output_directory_path="./build"

remove_output_directory() {
  if [ -d $output_directory_path ]; then
    rm -Rf $output_directory_path
  fi
}

build_project() {
  tsc
}

remove_output_directory
build_project