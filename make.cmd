set NODE_ENV=production
cmd.exe /c "babel src --out-dir lib"
set PACK=webpack --config webpack.config.js
cmd.exe /c "%PACK%"
set MINIFIED=1
%PACK%
