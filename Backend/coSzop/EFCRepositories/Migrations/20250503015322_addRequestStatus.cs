using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EFCRepositories.Migrations
{
    /// <inheritdoc />
    public partial class addRequestStatus : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "ShoppingRequests",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "ShoppingRequests");
        }
    }
}
