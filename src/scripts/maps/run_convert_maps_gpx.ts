import path from "path";
import { convertUrlToGpx } from "./convert_kmz_to_gpx";

const argv = process.argv.slice(2);
const urlFlag = argv.indexOf("--url");
const outFlag = argv.indexOf("--out");

function flagValue(flagIndex: number): string | undefined {
  return flagIndex !== -1 ? argv[flagIndex + 1] : undefined;
}

function isFlagValueIndex(i: number): boolean {
  return i === urlFlag + 1 || i === outFlag + 1;
}

const urlFromFlag = flagValue(urlFlag);
const urlPositional = argv.find(function isUrlArg(arg, i) {
  return arg.indexOf("--") !== 0 && !isFlagValueIndex(i) && arg.indexOf("://") !== -1;
});

const opts: { url?: string; outputPath?: string } = {};

if (urlFromFlag != null) {
  opts.url = urlFromFlag;
} else if (urlPositional != null) {
  opts.url = urlPositional;
}

const outPath = flagValue(outFlag);
if (outPath != null) {
  opts.outputPath = path.resolve(outPath);
}

void convertUrlToGpx(Object.keys(opts).length > 0 ? opts : undefined)
  .then(function onDone(info): void {
    // eslint-disable-next-line no-console
    console.info(
      "Fetched",
      String(info.bytesFetched),
      "bytes -> GPX",
      info.outputPath,
      "(" + String(info.bytesWritten) + " bytes)"
    );
  })
  .catch(function onErr(err): void {
    // eslint-disable-next-line no-console
    console.error(err);
    process.exit(1);
  });
