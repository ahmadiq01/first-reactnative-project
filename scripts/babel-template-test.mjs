import template from "@babel/template";

try {
  template.statement`if (a) return false;`;
  console.log("simple: ok");
} catch (e) {
  console.error("simple:", e.message);
}

try {
  template.statement`if (typeof Reflect === "undefined" || !Reflect.construct) return false;`;
  console.log("reflect: ok");
} catch (e) {
  console.error("reflect:", e.message);
}
