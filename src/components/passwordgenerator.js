import React, { useCallback, useEffect, useRef, useState } from "react";
import "./passgenerator.css";

function PasswordGenerator() {
    let [length, setLength] = useState(4);
    let [numAllow, setNumAllow] = useState(false);
    let [charAllow, setCharAllow] = useState(false);
    let [password, setPassword] = useState("");
    let passwordRef = useRef(null);

    const makePass = useCallback(() => {
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        let pass = "";

        if (numAllow) {
            str += "0123456789";
        }
        if (charAllow) {
            str += "@#$*!~&%";
        }

        for (let i = 1; i <= length; i++) {
            let char = ~~(Math.random() * str.length + 1);
            pass += str.charAt(char);
        }
        setPassword(pass);
    }, [length, numAllow, charAllow]);

    const passwordCopyOnClick = useCallback(() => {
        window.navigator.clipboard.writeText(password);
        passwordRef.current?.select();
    }, [password]);

    useEffect(() => {
        makePass();
    }, [length, numAllow, charAllow, makePass]);

    return (
        <div class="main">
            <h1 class="mainh1">Password Generator</h1>
            <div class="copy">
                <input type="text" value={password} placeholder="Password" readOnly ref={passwordRef}></input>
                <button onClick={passwordCopyOnClick}>Copy</button>
            </div>
            <div class="change">
                <input
                    type="range"
                    min={4}
                    max={20}
                    value={length}
                    onChange={(e) => {
                        setLength(e.target.value);
                    }}
                ></input>
                <label>Range: {length}</label>
                <input
                    type={"checkbox"}
                    defaultChecked={numAllow}
                    onChange={() => {
                        setNumAllow((prev) => !prev);
                    }}
                ></input>
                <label>Number Allow</label>
                <input
                    type={"checkbox"}
                    defaultChecked={charAllow}
                    onChange={() => {
                        setCharAllow((prev) => !prev);
                    }}
                ></input>
                <label>Spatial Character Allow</label>
            </div>
        </div>
    );
}

export default PasswordGenerator;
