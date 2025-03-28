export default abstract class Singleton<T> {
    private static _instances: Map<string, any> = new Map();

    protected constructor() {
        const className = this.constructor.name;

        if (Singleton._instances.has(className)) {
            throw new Error(`${className} is a singleton class. Use getInstance() to access it.`);
        }

        Singleton._instances.set(className, this);
    }

    public static getInstance<T>(this: new () => T): T {
        const className = this.name;

        if (!Singleton._instances.has(className)) {
            Singleton._instances.set(className, new this());
        }

        return Singleton._instances.get(className);
    }
}
