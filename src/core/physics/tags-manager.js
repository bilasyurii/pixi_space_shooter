export default class TagManager {
  constructor() {
    this._rules = {};
  }

  canCollide(tagA, tagB) {
    const rulesA = this._rules[tagA];

    if (rulesA) {
      const rule = rulesA[tagB];

      if (rule === undefined) {
        return true;
      }

      return rule;
    }

    return true;
  }

  registerBoth(tagA, tagB, collide) {
    this.registerOne(tagA, tagB, collide);

    if (tagA !== tagB) {
      this.registerOne(tagB, tagA, collide);
    }
  }

  registerOne(tagA, tagB, collide) {
    const rules = this._rules;

    if (rules[tagA] == undefined) {
      rules[tagA] = {};
    }

    rules[tagA][tagB] = collide;
  }
}
