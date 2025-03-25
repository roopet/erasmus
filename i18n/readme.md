
## i18n readme

1. Download [Python ~2.7.11](https://www.python.org/downloads/)
2. Install polib

```
pip install polib
```

3. Edit .po -files usin [Poedit](http://poedit.net/)
4. Compile .po to .mo (Poedit does this automagically
5. Compile .mo to .js using tojs.bat or cmd:

```
python po2js.py en.po se.po
```

### notes

* Do not edit .mo or .js files manually
