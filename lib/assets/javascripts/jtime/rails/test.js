var hash = {
    a: {
        a1: {
            a11: {
                a111: "a111"
            }

         },

         a2: {
             a21: "a21",
             a22: {
                a221: "a221"
             },
             a23: {
                 a231: "a231"
             }
         },

         a3: {
             a31: {
                a311: "a311"
             }
         }

    },

    b: {
        b1: {
            b11: "b11",
            b12: {
                b121: "b121"
            }
        }
    }
};

// hash.eachNodes(function (answer) {
//     console.log("key: " + answer.key + ", value: " + answer.value + ", trail: " + answer.trail.join(", "));
// });
