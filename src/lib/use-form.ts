import { useCallback, useRef, MutableRefObject } from 'react';

export function useForm<T extends { [key: string]: any }>() {
	const formRef = useRef<HTMLFormElement>(null);
	const inputRef = useRef<HTMLTextAreaElement | null>(null);
	const refCallback = useCallback((node: HTMLTextAreaElement | null) => {
		inputRef.current = node;
	}, []);

	const register = useCallback((name: keyof T) => ({
		name,
		ref: refCallback
	}), [refCallback]);

	const handleSubmit = useCallback((handler: (data: T) => Promise<void>) => {
		return async (e: React.FormEvent) => {
			e.preventDefault();
			const formData = new FormData(e.target as HTMLFormElement);
			const data = Object.fromEntries(formData) as T;
			await handler(data);
		};
	}, []);

	const watch = useCallback((field: keyof T) => {
		return inputRef.current?.value || '';
	}, []);

	return {
		register,
		handleSubmit,
		watch,
		formRef
	};
}