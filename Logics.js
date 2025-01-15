
function toBinary(number, bits) {
    return number.toString(2).padStart(bits, '0');
}

function groupByOnes(terms, bits) {
    const groups = {};
    terms.forEach(term => {
        const binary = toBinary(term, bits);
        const onesCount = binary.split('').filter(ch => ch === '1').length;
        if (!groups[onesCount]) {
            groups[onesCount] = [];
        }
        groups[onesCount].push(binary);
    });
    return groups;
}

function combineTerms(group1, group2, used) {
    const combined = [];
    group1.forEach(term1 => {
        group2.forEach(term2 => {
            const diffIndex = findSingleBitDifference(term1, term2);
            if (diffIndex !== -1) {
                used.add(term1);
                used.add(term2);
                combined.push(replaceBitWithDash(term1, diffIndex));
            }
        });
    });
    return combined;
}

function findSingleBitDifference(term1, term2) {
    let diffIndex = -1;
    for (let i = 0; i < term1.length; i++) {
        if (term1[i] !== term2[i]) {
            if (diffIndex !== -1) return -1; // More than one difference
            diffIndex = i;
        }
    }
    return diffIndex;
}

function replaceBitWithDash(term, index) {
    return term.substring(0, index) + '-' + term.substring(index + 1);
}

function findPrimeImplicants(groupedTerms) {
    const primeImplicants = new Set();
    const used = new Set();

    for (let i = 0; i < groupedTerms.length - 1; i++) {
        const group1 = groupedTerms[i];
        const group2 = groupedTerms[i + 1];
        const combined = combineTerms(group1, group2, used);
        group1.forEach(term => {
            if (!used.has(term)) {
                primeImplicants.add(term);
            }
        });
        groupedTerms[i + 1] = combined;
    }

    groupedTerms.forEach(group => {
        group.forEach(term => {
            if (!used.has(term)) {
                primeImplicants.add(term);
            }
        });
    });

    return primeImplicants;
}

function findEssentialPrimeImplicants(primeImplicants, minterms, bits) {
    const implicantCoverage = {};
    const mintermCoverage = {};

    primeImplicants.forEach(implicant => {
        const coveredMinterms = new Set();
        minterms.forEach(minterm => {
            if (matchesImplicant(implicant, toBinary(minterm, bits))) {
                coveredMinterms.add(minterm);
                if (!mintermCoverage[minterm]) {
                    mintermCoverage[minterm] = new Set();
                }
                mintermCoverage[minterm].add(implicant);
            }
        });
        implicantCoverage[implicant] = coveredMinterms;
    });

    const essentialPrimeImplicants = new Set();
    Object.entries(mintermCoverage).forEach(([minterm, implicants]) => {
        if (implicants.size === 1) {
            essentialPrimeImplicants.add([...implicants][0]);
        }
    });

    return essentialPrimeImplicants;
}

function matchesImplicant(implicant, minterm) {
    for (let i = 0; i < implicant.length; i++) {
        if (implicant[i] !== '-' && implicant[i] !== minterm[i]) {
            return false;
        }
    }
    return true;
}

function binaryToVariables(term, variables) {
    let result = '';
    for (let i = 0; i < term.length; i++) {
        if (term[i] === '1') {
            result += variables[i];
        } else if (term[i] === '0') {
            result += variables[i] + "'";
        }
    }
    return result;
}

// Example test case
const bits = 4; // Number of variables
const minterms = [0, 1, 2, 5, 6, 7, 8, 9, 10, 14];
const dontCares = [4, 15];

// Combine minterms and dont-cares
const allTerms = [...minterms, ...dontCares];

// Step 1: Group terms by the number of 1's
const groups = groupByOnes(allTerms, bits);

// Step 2: Combine terms iteratively
const groupedTerms = Object.values(groups);
const primeImplicants = findPrimeImplicants(groupedTerms);

// Step 3: Find essential prime implicants
const essentialPrimeImplicants = findEssentialPrimeImplicants(primeImplicants, minterms, bits);

// Step 4: Output the minimized Boolean function
const variables = ["A", "B", "C", "D"];
console.log("Minimized SOP form:");
essentialPrimeImplicants.forEach(implicant => {
    console.log(binaryToVariables(implicant, variables));
});
