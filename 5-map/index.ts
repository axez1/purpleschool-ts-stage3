type Bucket<K, V> = Array<[K, V]>;

class CustomMap<K, V> {
    private buckets: Array<Bucket<K, V>>;
    private size: number;
    private readonly initialCapacity: number;

    constructor(initialCapacity: number = 16) {
        this.initialCapacity = initialCapacity;
        this.buckets = new Array(initialCapacity);
        this.size = 0;
    }

    private hash(key: K): number {
        const keyString = String(key);
        let hash = 0;
        for (let i = 0; i < keyString.length; i++) {
            hash = (hash << 5) - hash + keyString.charCodeAt(i);
            hash |= 0; // Convert to 32-bit integer
        }
        return Math.abs(hash) % this.buckets.length;
    }

    private resize(): void {
        const newCapacity = this.buckets.length * 2;
        const newBuckets = new Array(newCapacity);

        for (const bucket of this.buckets) {
            if (bucket) {
                for (const [key, value] of bucket) {
                    const newHash = this.hash(key);
                    if (!newBuckets[newHash]) {
                        newBuckets[newHash] = [];
                    }
                    newBuckets[newHash].push([key, value]);
                }
            }
        }

        this.buckets = newBuckets;
    }

    set(key: K, value: V): void {
        const index = this.hash(key);

        if (!this.buckets[index]) {
            this.buckets[index] = [];
        }

        const bucket = this.buckets[index];
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket[i][1] = value;
                return;
            }
        }

        bucket.push([key, value]);
        this.size++;

        if (this.size / this.buckets.length > 0.75) {
            this.resize();
        }
    }

    get(key: K): V | undefined {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        if (bucket) {
            for (const [k, v] of bucket) {
                if (k === key) {
                    return v;
                }
            }
        }

        return undefined;
    }

    delete(key: K): boolean {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        if (bucket) {
            for (let i = 0; i < bucket.length; i++) {
                if (bucket[i][0] === key) {
                    bucket.splice(i, 1);
                    this.size--;
                    return true;
                }
            }
        }

        return false;
    }

    clear(): void {
        this.buckets = new Array(this.initialCapacity);
        this.size = 0;
    }

    getSize(): number {
        return this.size;
    }
}


const map = new CustomMap<string, number>();

map.set("one", 1);
map.set("two", 2);

console.log(map.get("two"));
console.log(map.delete("two"));
console.log(map.get("two"));

map.clear();
console.log(map.getSize());