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

var nodesEach = function (obj, callback, trail) {
    trail = trail || [];

    var
        value;

    Object.keys(obj).forEach(function (key) {
        value = obj[key];

        // chamar uma função recursivamente não substitui os valores do atual loop, nem o interrompe, mas define um novo loop para ser executado
        if (Object.getPrototypeOf(value) === Object.prototype) {
            //console.log(value);
            nodesEach(value, callback, trail.concat(key))
        } else {
            callback({key: key, value: value, trail: trail});
        }
    });
}

// o value pode ser entendido como o final da árvore
// a key o nome da função
nodesEach(hash, function (answer) {
    console.log("key: " + answer.key + ", value: " + answer.value + ", trail: " + answer.trail.join(", "));
});
