const webpackModules = cumcord.modules.webpackModules;

const useState = React.useState;
const Switch = webpackModules.findByDisplayName("Switch");
const Text = webpackModules.findByDisplayName("Text");
const Header = webpackModules.findByDisplayName("Header");
const SwitchItem = webpackModules.findByDisplayName("SwitchItem");

export default (props) => {
    const [enabled, setEnabled] = useState(props.enabled);
    return (
        <SwitchItem value={props.value} note={props.note} onChange={() => {
            setEnabled(!enabled);
            props.onChange(); //TODO: sync between the props and window object
        }} value={enabled}>
            {props.name}
        </SwitchItem>
    )
}
