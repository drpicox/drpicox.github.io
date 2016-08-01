#!/bin/bash
(cd _site; live-server) &
jekyll s -H 0.0.0.0 -w # --baseurl /
