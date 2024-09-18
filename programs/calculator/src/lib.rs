use anchor_lang::prelude::*;

declare_id!("GTbLqbGNUqamVzJQxECyTtUVGDsEUH4N6XiFZZNivT2q");

#[program]
pub mod calculator {
    use super::*;


    pub fn create(ctx:Context<Create>, init_message: String) ->  Result<()>{
        let calculator = &mut ctx.accounts.calculator;
        calculator.greeting = init_message;
        Ok(())
    }
    pub fn add(ctx: Context<Addition>, num1: i64, num2: i64) -> Result<()>{
        let calculator = &mut ctx.accounts.calculator;
        calculator.result = num1 + num2;
        Ok(())
    }

    pub fn multiply(ctx: Context<Multiplication>, num1: i64, num2: i64) -> Result<()> {
        let calculator = &mut ctx.accounts.calculator;
        calculator.result = num1 * num2;
        Ok(())
    }

    pub fn subtract(ctx: Context<Subtraction>, num1: i64, num2: i64) -> Result<()> {
        let calculator = &mut ctx.accounts.calculator;
        calculator.result = num1 - num2;
        Ok(())
    }

    pub fn divide(ctx: Context<Division>, num1: i64, num2: i64) -> Result<()> {
        let calculator = &mut ctx.accounts.calculator;
        let res = num1 % num2;
        if res == 0 {
            calculator.result = num1 / num2;
            calculator.remainder = 0;
        }
        else
        {
            calculator.result = (num1 / num2) as i64;
            calculator.remainder = res;
        }
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Create<'info> {
    #[account(init, payer = user, space = 8 + 64 + 64 + 64 + 64)]
    pub calculator: Account<'info, Calculator>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Calculator {
    pub greeting: String,
    pub result: i64,
    pub remainder: i64,
}

#[derive(Accounts)]
pub struct Addition<'info> {
    #[account(mut)]
    pub calculator: Account<'info, Calculator>,
}

#[derive(Accounts)]
pub struct Multiplication<'info> {
    #[account(mut)]
    pub calculator: Account<'info, Calculator>,
}

#[derive(Accounts)]
pub struct Subtraction<'info> {
    #[account(mut)]
    pub calculator: Account<'info, Calculator>,
}
#[derive(Accounts)]
pub struct Division<'info> {
    #[account(mut)]
    pub calculator: Account<'info, Calculator>,
}

