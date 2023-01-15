import assert from "node:assert";
import { checkEndsWithPeriod } from "../src/index.js";
describe("check-ends-with-period", () => {
    context("when period is end", () => {
        it("should return valid:true result", () => {
            const result = checkEndsWithPeriod("text.", {
                periodMarks: ["."]
            });
            assert.deepEqual(result, {
                valid: true,
                periodMark: ".",
                index: 4
            });
        });
        it("multiple marks should return valid:true result", () => {
            const result = checkEndsWithPeriod("テキスト。", {
                periodMarks: [".", "。"]
            });
            assert.deepEqual(result, {
                valid: true,
                periodMark: "。",
                index: 4
            });
        });
    });
    context("whitespace", () => {
        it("should return valid:false result when whitespace is end", () => {
            const result = checkEndsWithPeriod("text   ");
            assert.deepEqual(result, {
                valid: false,
                periodMark: "   ",
                index: 4
            });
        });
    });
    context("when not allowed mark is end", () => {
        it("should return valid:false result", () => {
            const result = checkEndsWithPeriod("text");
            assert.deepEqual(result, {
                valid: false,
                periodMark: "t",
                index: 3
            });
        });
    });

    context("when exclamation mark is end", () => {
        it("allowExceptionMark:true and should return valid:true result", () => {
            const result = checkEndsWithPeriod("text!", {
                allowExceptionMark: true
            });
            assert.deepEqual(result, {
                valid: true,
                periodMark: "!",
                index: 4
            });
        });
        it("allowExceptionMark:false and should return valid:false result", () => {
            const result = checkEndsWithPeriod("text!", {
                allowExceptionMark: false
            });
            assert.deepEqual(result, {
                valid: false,
                periodMark: "!",
                index: 4
            });
        });
    });
    context("when emoji is end", () => {
        it("allowEmoji:true and should return valid:true result", () => {
            const result = checkEndsWithPeriod("text❌", {
                allowEmoji: true
            });
            assert.deepEqual(result, {
                valid: true,
                periodMark: "❌",
                index: 4
            });
        });
        it("allowEmoji:false and should return valid:false result", () => {
            const result = checkEndsWithPeriod("text❌", {
                allowEmoji: false
            });
            assert.deepEqual(result, {
                valid: false,
                periodMark: "❌",
                index: 4
            });
        });
    });
});
