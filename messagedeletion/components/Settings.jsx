import SettingCard from "./SettingCard.jsx";

const webpackModules = cumcord.modules.webpackModules;

const FormTitle = webpackModules.findByDisplayName("FormTitle");
const FormDivider = webpackModules.findByDisplayName("FormDivider");
const FormSection = webpackModules.findByDisplayName("FormSection");

export default () => {
    return (
        <FormSection>
            <FormTitle tag="h1">
                BetterMessageDeletion
            </FormTitle>
            <FormDivider />
            <SettingCard name="Enable Toasts" note="Show a toast when a message is deleted." onChange={()=>{
                if (window.betterMessageDeletion_enableToasts !== undefined) {
                    window.betterMessageDeletion_enableToasts = !window.betterMessageDeletion_enableToasts;
                } else {
                    window.betterMessageDeletion_enableToasts = true;
                }
            }} enabled={false}>
            </SettingCard>
        </FormSection>
    )
}
