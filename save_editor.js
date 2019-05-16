import generateBaseSave from './base_state.js';

function convertToHex(s) {
    let conversionTable = {
        "A": [0x03, 0x30],
        "B": [0x03, 0x31],
        "C": [0x03, 0x32],
        "D": [0x03, 0x33],
        "E": [0x03, 0x34],
        "F": [0x03, 0x35],
        "G": [0x03, 0x36],
        "H": [0x03, 0x37],
        "I": [0x03, 0x38],
        "J": [0x03, 0x39],
        "K": [0x03, 0x3A],
        "L": [0x03, 0x3B],
        "M": [0x03, 0x3C],
        "N": [0x03, 0x3D],
        "O": [0x03, 0x3E],
        "P": [0x03, 0x3F],
        "Q": [0x03, 0x40],
        "R": [0x03, 0x41],
        "S": [0x03, 0x42],
        "T": [0x03, 0x43],
        "U": [0x03, 0x44],
        "V": [0x03, 0x45],
        "W": [0x03, 0x46],
        "X": [0x03, 0x47],
        "Y": [0x03, 0x48],
        "Z": [0x03, 0x49],
        "!": [0x0E, 0x6E],
        "?": [0x0E, 0x6F],
        "&": [0x03, 0x5D],
        "+": [0x0E, 0x6A],
        "-": [0x0E, 0x6B],
        ".": [0x0E, 0x77],
        "0": [0x0E, 0x60],
        "1": [0x0E, 0x61],
        "2": [0x0E, 0x62],
        "3": [0x0E, 0x63],
        "4": [0x0E, 0x64],
        "5": [0x0E, 0x65],
        "6": [0x0E, 0x66],
        "7": [0x0E, 0x67],
        "8": [0x0E, 0x68],
        "9": [0x0E, 0x69],
    };
    var name = [];
    // Hard limit to 6 since names are 6 characters long
    var len = s.length > 6 ? 6 : s.length;
    for (var i = 0; i < len; i++) {
        var hex = conversionTable[s[i]];
        name[i * 2] = hex[0];
        name[i * 2 + 1] = hex[1];
    }
    return name;
}

function createSave(name) {
    var base = generateBaseSave();
    for (var i = 0; i < name.length; i++) {
        base[0xC5B9 + i] = name[i];
    }
    return base;
}

window.addEventListener("load", function() {
    var nameInput = document.getElementById("name");
    var createButton = document.getElementById("create");

    createButton.onclick = function() {
        var save = createSave(convertToHex(nameInput.value.toUpperCase()));
        var bytes = new Uint8Array(save);
        var blob = new Blob([bytes], {type: "application/octet-stream"});
        var link = document.createElement("a");
        link.download = "Pokemon TCG Save.sn1";
        link.href = window.URL.createObjectURL(blob);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
});
