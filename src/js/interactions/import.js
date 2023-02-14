import { parseCsv } from "../utils/file";

export const handleCsvFileChange = (files, callback) => {
    if (files.length < 1)
        return callback("Choose CSV file...", null, null);

    const file = files[0];

    if (file.type !== "text/csv" && !file.name.includes(".csv"))
        return callback("Invalide file type, must be CSV file", null, null);

    let fileReader = new FileReader();
    fileReader.onload = (e) => callback(null, file.name, parseCsv(e.target.result));
    fileReader.onerror = (err) => callback(err, null, null);
    fileReader.readAsText(file);
};