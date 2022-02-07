use anchor_lang::prelude::*;

declare_id!("Gu7xYmGthCWx6ZYSHhFy6AzDh1qEEmaKdQjMrZQxmYWD");

#[program]
pub mod anchor_client {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>) -> ProgramResult {
        // Get a reference to the account.
        let base_account = &mut ctx.accounts.base_account;
        // Initialize total_gifs.
        base_account.total_votes = 0;
        Ok(())
    }

    pub fn add_vote(ctx: Context<AddVote>, selection: u8 ) -> ProgramResult {
        // Get a reference to the account and increment total_gifs.
        let base_account = &mut ctx.accounts.base_account;
        let user = &mut ctx.accounts.user;

        // Build the struct.
        let vote = VoteStruct {
          selection: selection,
          user_address: *user.to_account_info().key,
        };
    
        // Add it to the votes vector.
        base_account.votes.push(vote);
        base_account.total_votes += 1;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 9000)]
    pub base_account: Account<'info, BaseAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program <'info, System>,
}

#[derive(Accounts)]
pub struct AddVote<'info> {
  #[account(mut)]
  pub base_account: Account<'info, BaseAccount>,
  #[account(mut)]
  pub user: Signer<'info>,
}

// Create a custom struct for us to work with.
#[derive(Debug, Clone, AnchorSerialize, AnchorDeserialize)]
pub struct VoteStruct {
    pub selection: u8,
    pub user_address: Pubkey,
}

// Tell Solana what we want to store on this account.
#[account]
pub struct BaseAccount {
    pub total_votes: u64,
    pub votes: Vec<VoteStruct>
} 