export function useHotkeys() {
    const isMac = navigator.userAgent.includes('Mac OS X');
    const keyMapping = {
        save: isMac ? 'cmd+s' : 'ctrl+s'
    };

    const keyMappingHandlers = {
        save: (event: any) => {
            if ((event.metaKey || event.ctrlKey) && event.key === 's') {
                event.preventDefault();
            }
        }
    };

    return {
        keyMapping,
        keyMappingHandlers,
        isMac
    };
}
