function after({ seconds, fn_to_rn }: { seconds: number, fn_to_rn: Function }) {
    setTimeout(() => fn_to_rn(), seconds * 1000)
}

function show_tooltip({ msg, code }: { msg: string, code: number }) {
    const tooltip_element = document.createElement('div');
    tooltip_element.classList.add('animate__fadeInRight');
    tooltip_element.style.color = (code === 200 || code === 201) ? 'green' : 'red';
    tooltip_element.style.position = 'absolute';
    tooltip_element.style.zIndex = '10000000'
    tooltip_element.style.top = '10%';
    tooltip_element.style.right = '3%';
    tooltip_element.style.width = 'fit-content';
    tooltip_element.style.height = 'fit-content';
    tooltip_element.style.border = '1px solid gray';
    tooltip_element.style.borderRadius = '0.5em';
    tooltip_element.style.backgroundColor = 'white';
    tooltip_element.style.padding = '0.75em 1em';
    tooltip_element.textContent = msg;
    document.body.append(tooltip_element);

    after({
        seconds: 3, fn_to_rn: () => {
            tooltip_element.classList.remove('animate__fadeInRight');
            document.body.removeChild(tooltip_element);
        }
    })
}

export {show_tooltip}