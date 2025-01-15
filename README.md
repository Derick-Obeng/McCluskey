# McCluskey
test case


---

# Quine-McCluskey Algorithm

This project implements the Quine-McCluskey algorithm for minimizing Boolean functions. The algorithm is used to simplify Boolean expressions, making them more efficient for digital circuit design.

## Features

- Convert numbers to binary representation with a fixed number of bits.
- Group minterms by the number of 1's in their binary representation.
- Combine terms that differ by one bit and mark combined terms.
- Identify prime implicants from grouped terms.
- Map minterms to prime implicants and find essential ones.
- Convert binary terms with dashes to Sum of Products (SOP) form.

## Getting Started

### Prerequisites

- Java Development Kit (JDK) for the original Java implementation.
- Node.js for the JavaScript implementation.



### Usage

1. Modify the `minterms` and `dontCares` arrays in the `main` function to include your desired minterms and don't-care conditions.
2. Run the program to get the minimized Boolean function in SOP form.

### Example

For the given minterms and don't-cares:
```java
int bits = 4; // Number of variables
List<Integer> minterms = Arrays.asList(0, 1, 2, 5, 6, 7, 8, 9, 10, 14);
List<Integer> dontCares = Arrays.asList(4, 15);
```

The output will be the minimized SOP form of the Boolean function.

### Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

### License

This project is licensed under the MIT License.
