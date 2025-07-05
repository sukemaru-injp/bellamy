export abstract class Option<T> {
	abstract isSome(): this is Some<T>;
	abstract isNone(): this is None<T>;

	abstract map<U>(f: (value: T) => U): Option<U>;
	abstract flatMap<U>(f: (value: T) => Option<U>): Option<U>;
	abstract filter(predicate: (value: T) => boolean): Option<T>;
	abstract getOrElse(defaultValue: T): T;
	abstract getOrElseThrow(error?: Error): T;

	static some<T>(value: T): Option<T> {
		return new Some(value);
	}

	static none<T>(): Option<T> {
		return new None<T>();
	}

	static fromNullable<T>(value: T | null | undefined): Option<T> {
		return value != null ? Option.some(value) : Option.none<T>();
	}
}

class Some<T> extends Option<T> {
	constructor(private readonly value: T) {
		super();
	}

	isSome(): this is Some<T> {
		return true;
	}

	isNone(): this is None<T> {
		return false;
	}

	map<U>(f: (value: T) => U): Option<U> {
		return Option.some(f(this.value));
	}

	flatMap<U>(f: (value: T) => Option<U>): Option<U> {
		return f(this.value);
	}

	filter(predicate: (value: T) => boolean): Option<T> {
		return predicate(this.value) ? this : Option.none<T>();
	}

	getOrElse(_defaultValue: T): T {
		return this.value;
	}

	getOrElseThrow(_error?: Error): T {
		return this.value;
	}
}

class None<T> extends Option<T> {
	isSome(): this is Some<T> {
		return false;
	}

	isNone(): this is None<T> {
		return true;
	}

	map<U>(_f: (value: T) => U): Option<U> {
		return new None<U>();
	}

	flatMap<U>(_f: (value: T) => Option<U>): Option<U> {
		return new None<U>();
	}

	filter(_predicate: (value: T) => boolean): Option<T> {
		return this;
	}

	getOrElse(defaultValue: T): T {
		return defaultValue;
	}

	getOrElseThrow(error?: Error): T {
		throw error || new Error('Option is None');
	}
}
