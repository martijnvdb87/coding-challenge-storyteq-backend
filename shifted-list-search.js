var getLargestInteger = function (input) {
    if (input.length < 1) {
        return null;
    }
    // Prevent duplicates
    input = Array.from(new Set(input));
    // Check if array is not shifted
    if (input[0] <= input[input.length - 1]) {
        return input[input.length - 1];
    }
    var check = function (input) {
        // Length is 1 if the highest number is found
        if (input.length === 1) {
            return input;
        }
        var parts = splitArray(input);
        var output = [];
        parts.forEach(function (part) {
            // Find the unordered half
            if (part[part.length - 1] < part[0]) {
                output = check(part);
            }
        });
        // If no unordered half is found, then one of the endings is the highest number
        if (output.length === 0) {
            return [
                Math.max(parts[0][parts[0].length - 1], parts[1][parts[1].length - 1])
            ];
        }
        return output;
    };
    return check(input)[0];
};
var splitArray = function (input) {
    var middle = Math.round(input.length / 2);
    var start = input.slice(0, middle);
    var end = input.slice(middle, input.length);
    return [start, end];
};
console.log(getLargestInteger([1, 3, 7, 8, 9, 10, 11]));
console.log(getLargestInteger([8, 9, 10, 11, 1, 3, 7]));
console.log(getLargestInteger([2, 4, 6, 8, 10]));
console.log(getLargestInteger([6, 8, 10, 2, 4]));
console.log(getLargestInteger([2, 4, 6, 8, 10]));
console.log(getLargestInteger([2, 4, 6, 8, 10]));
