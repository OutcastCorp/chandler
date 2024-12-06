import Commands from "../../data/classes/commands.js";

import { deferComponents } from "@magicalbunny31/pawesome-utility-stuffs";


/**
 * @param {import("@flooded-area-moderation-types/client").StringSelectMenuInteraction} interaction
 */
export default async interaction => {
   // select menu info
   const [ _selectMenu, _rawSelectMenuIndex ] = interaction.customId.split(`:`);
   const [ selectedMenu ] = interaction.values;


   // defer the interaction
   if (
      interaction.message?.interactionMetadata && interaction.message?.interactionMetadata.user.id === interaction.user.id
         || interaction.message?.reference && (await interaction.message.fetchReference()).author.id === interaction.user.id
   )
      await interaction.update({
         components: deferComponents(interaction.customId, interaction.values, interaction.message.components)
      });

   else
      await interaction.deferReply({
         ephemeral: true
      });



   // show command help
   const commands = new Commands(interaction, selectedMenu);

   await commands.showCommands();
};